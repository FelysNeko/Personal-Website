# Personal Website

This the repo for my portfolio website, and my only public repo. I will try to bring all my major projects to it, and the code I put here generally represents my best coding ability.

## Apps and Middlewares
- [felys](/felys/) - Axum app for Felys-Interpreter
- [frontend](/frontend/) - Next.js app of the website
- [nginx](/nginx/) - Reverse proxy for the backend cluster

There will be more apps added to the website as demos in the future, but only the big ones.

## Infrastructure
Since I don't get any profit from this website, I have to keep the budget low. Therefore, all the services I used might not be the best one but definitely the most wallet-friendly one. In general, everything I used is free.

- Cloudflare: domain registrar, free website analytics, free DDOS mitigation, and free SSL/TLS certificate
- AWS: free virtual private server which I can run docker compose inside for backend cluster (ECS and EKS are way too expensive)
- Vercel: free Next.js hosting which comes with seamless CI/CD with GitHub, and free CDN 
- Docker: create lightweighted cluster and simplify deployment
- Nginx: api gateway, reverse proxy, and load balancing if I want
- Next.js: server side rendering, and app router
- Axum: async lower level framework

Although I say it is backend cluster, it actually only has one app for now. However, I am thinking of bring some of my python project to the website as well, and in this case, FastAPI/Flask will be my first choice. 
