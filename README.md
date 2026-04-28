#  Akan Name Generator

## Description

The Akan Name Generator is a web application that generates a traditional Akan name based on a user’s date of birth and gender.

In Akan culture (from Ghana), children are given names according to the day of the week they were born. This application helps users easily discover their Akan name.

## Author

Sharon Ngigi

## link to the page
https://gigishazy-jpg.github.io/akan-name-generator/


##  Setup Instructions

Ensure you have the following installed:

1 Git
2 A web browser (Chrome, Firefox, etc.)
3 (Optional) VS Code or any code editor


### Installation Process

1. Clone the repository
   git clone <your-repo-link>

2. Navigate into the project folder
    cd akan-name-generator

3. Open the project in your code editor 
   code .

4. Open the application

   * Locate the `index.html` file
   * Double-click it

   

---

### Alternative Setup (Without Git)

1. Download the ZIP file from GitHub
2. Extract the files
3. Open the folder
4. Double-click `index.html`

##  How It Works

1. Enter your birth date
2. Select your gender
3. Click "YOUR AKAN NAME" button
4. The app calculates the day of the week
5. Your Akan name is displayed


##  BDD (Behavior Driven Development)

| Scenario      | Input                   | Expected Output            |
| ------------- | ----------------------- | -------------------------- |
| Valid input   | Birth date + gender     | Displays correct Akan name |
| Invalid day   | Day ≤ 0 or Day > 31     | Error message              |
| Invalid month | Month ≤ 0 or Month > 12 | Error message              |
| Missing input | No date or gender       | Prompt user to fill fields |


##  Akan Name Reference

| Day       | Male Name | Female Name |
| --------- | --------- | ----------- |
| Sunday    | Kwasi     | Akosua      |
| Monday    | Kwadwo    | Adwoa       |
| Tuesday   | Kwabena   | Abenaa      |
| Wednesday | Kwaku     | Akua        |
| Thursday  | Yaw       | Yaa         |
| Friday    | Kofi      | Afua        |
| Saturday  | Kwame     | Ama         |


##  Technologies Used

 HTML
CSS
JavaScript



##  Features

 Simple and user-friendly interface
 Instant Akan name generation
 Input validation for date fields
 Gender-based name selection



##  License

This project is licensed under the MIT License.

Copyright (c) 2026 Sharon Ngigi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files


## Future Improvements

 Improve UI/UX design
 Add animations and better feedback
 Deploy a live version
 Enhance accessibility


