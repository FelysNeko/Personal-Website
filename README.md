# Personal Website

This the repo for my portfolio website, and my only public repo. I will try to bring all my major projects to it, and the code I put here generally represents my highest coding level. However, I might hide this repo at any point. 

## Apps and Middlewares

- [axum](/axum/) - Axum app for Felys-Interpreter
- [fast](/fast/) - FastAPI app for python toolset
- [nextjs](/nextjs/) - Next.js app of the website
- [nginx](/nginx/) - Reverse proxy for the backend cluster

There will be more apps added to the website as demos in the future, but only the big/interesting ones.

## Infrastructure

Since I don't get any profit from this website, I have to keep the budget low. Therefore, all the services I use might not be the best one but definitely the most wallet-friendly one. In general, everything I used is free.

- Cloudflare: domain registrar, free website analytics, free DDoS mitigation, and free SSL/TLS certificate
- AWS: free virtual private server which I can run docker compose inside for backend cluster
- Vercel: free Next.js hosting which comes with seamless CI/CD with GitHub, and free CDN 
- Docker: create lightweighted cluster and simplify deployment
- Nginx: api gateway, reverse proxy, and load balancing if I want
- Next.js: server side rendering, and app router
- FastAPI: fastest python web framework
- Axum: rust web framework from tokio team

Putting Cloudflare in front of Vercel seems unnecessary since they both have CDN/analytics, but it's not. If someone requests too much data to your website on Vercel (typically DDoS), Vercel will send you a huge bill for that traffic. However, if you put Cloudflare in front of Vercel, the former will cache the static files like images which is attackers' common target, so the traffic flow will not even hit Vercel. Cloudflare is the your last shield before Vercel charges you.

Running a cluster on a super weak free EC2 instance sounds so bad, but I couldn't figure out a way to run them for free. Again, doing this will only let AWS changes me 1 dollar per month for key management fee. If I use ECS or EKS and a ALB in front of them, the monthly bill will probably exceed 50 dollars. Let me know if you any better solution.

## Future

Let me find a co-op first...
