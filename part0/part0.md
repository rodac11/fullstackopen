# Answer Sheet for Part 0
## 0.1 HTML
*This exercise is not submitted to GitHub, it's enough to just read the tutorial*
## 0.2 CSS
*This exercise is not submitted to GitHub, it's enough to just read the tutorial*
## 0.3 HTML Forms
*This exercise is not submitted to Github, it's enough to just read the tutorial*

## 0.4 New Note Diagram
```mermaid
sequenceDiagram
    participant browser
    participant server
	
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server
	server-->>browser: HTML document

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
	
## 0.5 Single Page App Diagram
```mermaid
sequenceDiagram
    participant browser
    participant server
	
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
	activate server
	server-->>browser: HTML document

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server
```

## 0.6 New note in single page app diagram
```mermaid
sequenceDiagram
	participant browser
	participant server
	
	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
	activate server
	server-->>browser: Status Code 201 created.
	
	
    Note right of browser: There are no further HTTP requests, instead using the javascript code to display new information.
```
