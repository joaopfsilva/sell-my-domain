# Express.js Domain Landing Page Generator

## Goal/Motivation

The goal of this project is to provide a **quick and simple solution** for generating a landing page to inform users that a domain is for sale. This script allows you to create a basic webpage where potential buyers can see that the domain is available and contact you via email. The entire process is automated to streamline the deployment to Fly.io and the uploading of the code to GitHub.

If you want to make the landing page available under the domain itself (which is recommended), you simply need to configure your domain's DNS to point to the Fly.io application.

## How can I launch my webpage to sell my domain?

1. (first time) run `yarn install`
2. `yarn create-domain`
   2.1. Insert domain name
   2.2. Insert email address to be contacted

At this moment, you should have a new github repository and a new fly.io app

If you want to run it locally, you can do:

```
cd output/<domain-name>
yarn install
yarn start
open browser and visit http://localhost:3000
```

## How can I connect fly.io app to my domain?

Follow the official steps here: https://fly.io/docs/networking/custom-domain/

## How can I delete my app from fly.io and github?

```
yarn destroy-domain
<insert domain-name>
```

This will delete:

1. github repository (it requires higher permissions)
2. delete fly ip app
3. delete code from output/<domain-name>

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**. You are free to use, share, and modify this project as long as it is for **non-commercial purposes**.

## Prerequisites

To use this project, ensure you have the following installed on your machine:

- **Node.js**
- **Yarn**
- **Git**
- **GitHub CLI (`gh`)**
- **Fly.io CLI (`flyctl`)**

## Output

- express app (ready-to-use) under /output/${domain_name} (just need to run yarn start fore the first time)
- private github repository created on your account
- new fly.io application created with 256MB and 1x CPU (the minimum possible requirement)

## Limitations

- This fails if you already have a github repository with the same name

## Contributions

This project may contain bugs and limitations, which are most than welcome to be fixed. It's inteded to be a project where anyone is welcome to contribute, learn and share knowledge.

## Support

If you find this project helpful and want to support its development, you can buy me a coffee! ☕

[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/codeandwaves)
