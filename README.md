## Intro

Your mission, should you choose to accept it, is to build a UI that allows users to search for food products and build a shopping list.

Please spend a **maximum** of 5 hours on this project.
It's great if you finish sooner, it's also fine if you don't get through all tasks in the 5 hours.
We can discuss the challenges and decisions in the following code review.

**IMPORTANT:** We are looking for a functioning proof-of-concept above all else.
When given a choice, consider erring on the side of function over form and of critical features above nice-to-haves.
It's up to you to decide which is which, there isn't a clear right answer, but we expect you to argue your decisions.

If you have questions and can't unblock yourself, feel free to reach-out directly to: tech-interviews@pinto.co

## Technologies Used

- Front-End:
    - [React](https://reactjs.org/docs/react-api.html)
    - [Stylus](https://stylus-lang.com/)
    - [CSS Modules](https://github.com/css-modules/css-modules)
- Backend:
    - [node v12](https://nodejs.org/dist/latest-v12.x/docs/api/)
    - [express server](https://expressjs.com/en/4x/api.html)

## Objectives

Tackle these objectives in any order you see fit

1. Build a UI where users can search for products
    * Fetch and display at most 10 products at a time
    * Have the ability to search for products by name, calories, and the other filters defined in server/index.js
    * Display the list of returned products with a relevant datapoint
1. Display an image for each returned product
    * The image data for each product is stored in a separate `Image` model
1. Show contextual information on each product result
    * E.g. if searching for "Apples, >= 50 calories, Vegan", display calories and diet information on each result
1. Add the ability to store multiple products in a shopping list
    * You should be able to add products from the search to the shopping list
    * It should be possible to see the full shopping list
    * It should be possible to remove products from the list
    * Show some aggregate stats for each shopping list
1. Save shopping list to the API
    * Use the save endpoint to save the data to the API
    * Display all saved shopping lists on page load
    * Add the ability to select a list and see what products it has

## Constraints

* You can modify all parts of the existing code to better suit your needs, but please keep the database files as is (files in: `server/db/*`)
* Your code should work well in the latest Chrome browser. Don't worry about other browsers and older versions
* Don't worry about multiple screens/mobile. It should look ok on an average laptop screen
* Must have over nice-to-have
* Functionality over form

## API Endpoints:

* `GET /api/product/:id` Get all the data for a product with the given `:id`
* `GET /api/products` Filter products based on a given filters. Supports the following params:
    * `limit=N` - Limit the number of returned results to `N`
    * `skip=N` - Skip the first `N` results
    * `filters=JSON` Pass property filters. Format: Stringified JSON object.

        **Example:** `/api/products?limit=10&filters={"name":"apple","nutrition.calories":">20"}`

        **Available filters:**

        | filter key                | type              | example                             |
        |------------------------   |---------------    |------------------------------------ |
        | name                      | String            | `"name": "apple"`                   |
        | brand                     | String            | `"brand": "KIND"`                   |
        | diets                     | Array[String]     | `"diets": ["Vegan", "Ketogenic"]`   |
        | allergens                 | Array[String]     | `"allergens": ["Corn"]`             |
        | nutrition.calories        | String            | `"nutrition.calories": "> 100"`     |
        | nutrition.fiber           | String            | `"nutrition.fiber": "< 20"`         |
        | nutrition.protein         | String            | `"nutrition.protein": "5"`          |
        | nutrition.saturatedFat    | String            | `"nutrition.saturatedFat": "> 10"`  |
        | nutrition.sugar           | String            | `"nutrition.sugar": "> 20"`         |
        | nutrition.totalFat        | String            | `"nutrition.totalFat": "< 200"`     |
* `GET /api/lists` Retrieve all the shopping lists
* `GET /api/list/:id` Get all the data for a shopping list with the given `:id`
* `POST /api/list` Save a shopping list locally.
    Required body:
    * `name` String             The name of the shopping list
    * `products` Array<Number>  A list of product ids in the shopping list
    Returns: the newly created shopping list with an auto-generated `id`

## Project Setup

Install dependencies with either `npm` or `yarn`

```bash
npm install
```

Start the development server.

```
npm start
```

This will start both the API server (server/index.js) as well as the webpack dev server.

Finally open http://localhost:5000 to see the boilerplate.

It is setup with webpack and supports HMR.
It uses [CSS Modules](https://github.com/css-modules/css-modules) and uses [Stylus](http://stylus-lang.com) as the CSS pre-processor.
If you haven't worked with Stylus before, it's fine, you can write normal CSS files as well or write normal CSS in Stylus (Stylus is a superset of the CSS syntax).

