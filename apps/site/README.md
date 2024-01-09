## Getting Started

This is the instructions on setting up this project locally.
To run the project locally follow these simple example steps.

### Build

To build the package, run the following command:

```
pnpm run build
```

### Develop

To run the development server, run the following command:

```
pnpm run dev
```

## Usage

This is an example of how you can use the backend package in your project.
Once you have installed the project, you can import the package and use it in your app directory.

```jsx
import apiConnector from '@metajob/api-connector'

// find all jobs
const connect = await apiConnector
const jobs = await connect.getJobs()

```

In the above example, you can see that all the backend functions are in the connect object. You can pass the required props to the function and use it in your project.

## Useful Links

- [Contact Us](https://jstemplate.net/contact-us)
- [Documentation](https://docs.jstemplate.net)
- [All Products](https://jstemplate.net)
