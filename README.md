## Getting Started

This is the instructions on setting up this project locally.
To run the project locally follow these simple following steps.

### Project structure

The project is structured as a monorepo and includes the following packages:

-   `apps/site`: main site built with Next.js and Tailwind CSS. You will deploy `site`
-   `packages/next-mongo`: a package that provides the complete backend with mongodb database.
-   `packages/api-connector`: a package that connect the backend source.
-   `packages/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo

### Prerequisites

Please make sure that you have latest version of pnpm, npm or yarn installed in your system. You can install the latest version of pnpm, npm or yarn by running the following command in your terminal:

-   pnpm Installation

```sh
npm install pnpm@latest -g
```

-   npm Installation

```sh
npm install npm@latest -g
```

-   yarn Installation

```sh
npm install yarn@latest -g
```

### Installation

Installing the project is easy and straight forward. If you're using pnpm, simply run the following command in your terminal from project root:

```sh
pnpm install
```

That's it! The package will now be installed and ready for use in your project. You can then import the package and use its components in your code. Please make sure that you have latest version of pnpm, npm or yarn installed in your system."

<Callout type="info" emoji="ℹ️">
	<strong>NOTE:</strong> Ensure that you have included all key-value pairs in
	the .env.local file located in the apps/site directory.
</Callout>

#### .env File Example

```sh
API_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
MONGODB_URL="YOUR_MONGODB_URI"
ADMIN_CONTACT_EMAIL=""
NODEMAILER_HOST=""
NODEMAILER_PASSWORD=""
NODEMAILER_EMAIL=""
CLOUDINARY_API_SECRET=""
CLOUDINARY_API_KEY=""
CLOUDINARY_CLOUD_NAME=""

```

### Build

**Please add all the environment variables from the example env file at apps/site**

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

## Useful Links

-   [Contact Us](https://jstemplate.net/contact-us)
-   [Documentation](https://docs.jstemplate.net/metajob)
-   [All Products](https://jstemplate.net)
