const json=(statusCode,body)=>({statusCode,headers:{"Content-Type":"application/json","Cache-Control":"no-store"},body:JSON.stringify(body)});
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export default async (request)=>{
  if(request.method!=="POST") return json(405,{error:"Method not allowed."});
  const origin=request.headers.get("origin");
  const siteUrl=process.env.URL||process.env.DEPLOY_PRIME_URL;
  if(origin&&siteUrl){try{if(new URL(origin).host!==new URL(siteUrl).host)return json(403,{error:"Origin not allowed."})}catch{return json(403,{error:"Origin not allowed."})}}
  let data;try{data=await request.json()}catch{return json(400,{error:"Invalid request."})}
  const name=String(data.name||"").trim(),company=String(data.company||"").trim(),email=String(data.email||"").trim(),message=String(data.message||"").trim(),website=String(data.website||"").trim();
  if(website)return json(200,{ok:true});
  if(!name||name.length>100||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||!message||message.length>5000||company.length>150)return json(400,{error:"Please check the required fields and try again."});
  const apiKey=process.env.RESEND_API_KEY,to=process.env.CONTACT_TO_EMAIL,from=process.env.CONTACT_FROM_EMAIL;
  if(!apiKey||!to||!from)return json(503,{error:"The contact service is not configured yet. Please try again later."});
  const content={from,to:[to],reply_to:email,subject:"Website enquiry — "+name,text:"Name: "+name+"\nCompany: "+company+"\nEmail: "+email+"\n\nMessage:\n"+message,html:"<h2>Website enquiry</h2><p><b>Name:</b> "+escapeHtml(name)+"</p><p><b>Company:</b> "+escapeHtml(company||"—")+"</p><p><b>Email:</b> "+escapeHtml(email)+"</p><p><b>Message:</b></p><p>"+escapeHtml(message).replace(/\n/g,"<br>")+"</p>"};
  try{const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+apiKey,"Content-Type":"application/json"},body:JSON.stringify(content)});if(!response.ok)return json(502,{error:"The message could not be delivered. Please try again later."});return json(200,{ok:true})}catch{return json(502,{error:"The message could not be delivered. Please try again later."})}
};
export const config={path:"/.netlify/functions/contact"};
