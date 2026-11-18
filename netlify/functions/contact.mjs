const reply=(status,body)=>Response.json(body,{status,headers:{"Cache-Control":"no-store"}});
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export default async (request)=>{
  if(request.method!=="POST") return reply(405,{error:"Method not allowed."});
  const allowed=[...(process.env.ALLOWED_ORIGINS||"").split(",").map(x=>x.trim()).filter(Boolean),process.env.URL,process.env.DEPLOY_PRIME_URL].filter(Boolean);
  const origin=request.headers.get("origin");
  if(!allowed.length)return reply(503,{error:"The contact service is not configured yet."});
  if(origin&&!allowed.some(value=>{try{return new URL(value).origin===new URL(origin).origin}catch{return false}}))return reply(403,{error:"Origin not allowed."});
  let data;try{data=await request.json()}catch{return reply(400,{error:"Invalid request."})}
  const name=String(data.name||"").trim(),company=String(data.company||"").trim(),email=String(data.email||"").trim(),message=String(data.message||"").trim(),website=String(data.website||"").trim();
  if(website)return reply(200,{ok:true});
  if(!name||name.length>100||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)||email.length>254||!message||message.length>5000||company.length>150)return reply(400,{error:"Please check the required fields and try again."});
  const apiKey=process.env.RESEND_API_KEY,to=process.env.CONTACT_TO_EMAIL,from=process.env.CONTACT_FROM_EMAIL;
  if(!apiKey||!to||!from)return reply(503,{error:"The contact service is not configured yet."});
  const content={from,to:[to],reply_to:email,subject:"Website enquiry — "+name,text:"Name: "+name+"\\nCompany: "+company+"\\nEmail: "+email+"\\n\\nMessage:\\n"+message,html:"<h2>Website enquiry</h2><p><b>Name:</b> "+escapeHtml(name)+"</p><p><b>Company:</b> "+escapeHtml(company||"—")+"</p><p><b>Email:</b> "+escapeHtml(email)+"</p><p><b>Message:</b></p><p>"+escapeHtml(message).replace(/\\n/g,"<br>")+"</p>"};
  try{const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+apiKey,"Content-Type":"application/json"},body:JSON.stringify(content)});if(!response.ok)return reply(502,{error:"The message could not be delivered. Please try again later."});return reply(200,{ok:true})}catch{return reply(502,{error:"The message could not be delivered. Please try again later."})}
};
export const config={path:"/.netlify/functions/contact"};
