# Innova Talk 2022 - server

### How deploy to Heroku
## Deploy on Heroku
- Create an account on Heroku (heroku.com)
- Create a new application, put the name, and keep region on USA, and click Create
- on the application folder, type "heroku login", follow the guidance
- After follow the guidance on Heroku page
  - cd {Appliation folder}
  - git init
  - heroku git:remote -a {application name} 
  - git add .
  - git commit -am "make it better"
  - git push heroku ## master ##
- P.S.: always you update something execute the last 3 steps once again

## Save on GitHub too
- Create a repository on GitHub
- Execute the following steps:
    - git commit -am "make it better"
    - git branch -M main
    - git remote add origin {repository url}
    - git push -u origin main
