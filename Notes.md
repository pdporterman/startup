1. What ports are used for HTTP, HTTPS, SSH?
> 80, 443, 22
2. What do HTTP status codes in the 300, 400, 500 range indicate?
> redirect, client error, server error 
3. What does the HTTP header content-type allows you to do?
> what type of content we are dealing with 
4. What do the following attributes of a cookie do?
> Domain - where the cookie is coming from 
> Path - where it is generated 
> SameSite - only return to the same domain where it came from 
> HTTPOnly - stops javasript from running on the broweser so the cookie can be read 
5. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?
> (find the first consol log)
6. Given the following Express service code: What does the following JavaScript fetch return?
> 
7.Given the following MongoDB query
```JS
{ cost: { $gt: 10 }, name: /fran.*/}
```
select all of the matching documents.
> grab all docs with a cost greater then 10 and any name with fran followed by any character
8. How should you store user passwords in a database?
> hash and salted 
9. Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?
> (look at the consol logs)
10. What is the WebSocket protocol used for?
> inisitate instant contact between server and cliant either can start 
11. What is JSX and how are the curly braces rendered?
> JS and HTML combined
12. Assuming a HTML document with a
```html
<div id="root"></div>
```element, what content will the following React component generate?
```jsx
  function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      function App() {
        return (
          <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
          </div>
        );
      }
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
```
Assuming a HTML document with a
```html
<div id="root"></div>
```
element, what content will the following React component generate?
```jsx
      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      function App() {
        return (
          <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
          </div>
        );
      }
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
```
> return everythin in the div tag to the react app 
13. Assuming a HTML document with a
```html
<div id="root"></div>
```
element, what content will the following React component generate?
```jsx 
    function Numbers() { 
      const numbers = [1, 2, 3, 4, 5];
      const listItems = numbers.map((number) =>
        <li>{number}</li>
      );
      return(<ul>{listItems}</ul>)
    }
    const root = ReactDOM.createRoot(document.getElementById('root')); 
    root.render(<Numbers/>);
    ```
    > returns the list (order is unordered list) bullet followed by item 
    14. What does the following React component do?
    ```jsx
    function Example() {
  // Declare a new state variable, which we'll call "count"  
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
> returns a componet with a counter and button that adds to the counter
15. What are React Hooks used for?
> change the state of a componet like loading on start up 
16. What is the useEffect hook used for?
> watches lifecycle event of componets, basicly updates the render when things change
17. What does this code do?
```jsx
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```
> tells the page what to render based on the route (what is searched for)
18. What role does npm play in web development?
> manages node pacakages and download 3rd party packages 
19. What does package.json do in a npm project?
> lists all packages, when deploying it tells what packages to install, also has meta info for the project
20. What does the fetch function do?
>  make asynchronous requests to the server and load the information that is returned by the server onto the web pages.
21. What does node.js do?
> runs the server 
22. What does Vite do?
> bundels code to for production and can be deployed to a server 
