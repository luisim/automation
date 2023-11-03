# E2E testing

This document explains how to run and record new E2E tests. We are using `javascript` and `yarn` tooling to execute `playwright` as the test runner.

For more information on playwright see the [documentation](https://playwright.dev/docs/intro)

## Installation

Install dependencies with:

- `yarn install`

## Invoking tests

- `yarn e2e`

This will run all the E2E for the training-client app.

- `yarn e2e:headed`

Runs all tests in headed (visual) mode. A browser will spawn and you can watch it run through the tests!

- `yarn e2e:slow-motion`

Same as headed but with a delay of 5000ms between each action.

## Linting

Linting in this project works the same as every other project in this repo. The only difference is the rules inside the tests themselves. We are using the [recommended rules plugin for playwright](https://github.com/playwright-community/eslint-plugin-playwright)

Simply run `yarn lint` and all JS files will be checked.

## BeforeEach hook

A BeforeEach hook is used to run certain code before each test. This will add a performance burden to the test suite, so avoid using it unless is strictly necessary, for example if you need to navigate to certain tab before each test.

## BeforeAll hook

This hook will help with performance, use it when you want to setup a default configuration to execute the suite, for example if all the tests of the suite are intended to test a certain page within the app, the beforeAll could be used to navigate to that tab instead of navigating within each test.
