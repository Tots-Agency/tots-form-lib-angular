# TotsFormLibAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# MIA Form Angular

# GitHub Action Deploy

This project provides a GitHub Action that automatically deploys a package to npm whenever a new tag is created in the repository. The action updates the version in `package.json` to match the tag version before publishing.

## Prerequisites
- An npm account and an access token with publish permissions.
- The npm token should be stored as a secret in your GitHub repository settings (e.g., `NPM_TOKEN`).

## Usage

1. **Create a Tag**: To trigger the deployment, create a new tag in your repository starting with the v letter. You can do this using the following command:

   ```bash
   git tag v18.0.0
   git push origin v18.0.0
   ```

   Get list of tags

   ```bash
   git tag --sort=v:refname
   ```

2. **Workflow Configuration**: The action is configured in the `.github/workflows/deploy.yml` file. This file defines the workflow that runs on tag creation.

3. **Version Replacement**: The action will automatically replace the version in `package.json` with the tag version.

4. **Publishing**: After updating the version, the action will publish the package to npm using the `JS-DevTools/npm-publish` action.
