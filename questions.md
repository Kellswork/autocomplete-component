## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

- A regular component is the base React component that renders whenever there is a change in its state or props, while Pure Components only re-render when the props or state actually changes.

- A regular component doesn't have the `shouldComponentUpdate` method built in, while a Pure Component has the `shouldComponentUpdate` method built in and automatically implements it.

**Where might the app break?**

Pure components in React can't be used with complex data structures or nested objects. They only do a shallow comparison between the old and new states. If the two states are identical, even if the new state has changed, the component won't render the new state. This means that with complex data structures, the shallow comparison may not be able to detect changes in the state values.



## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Context is a way of passing data from a parent component to any child component deep within its tree. It also causes each component that contains its context value to re-render when there is an update. On the other hand, ShouldComponentUpdate is used to determine if a component's state or props have changed before it can re-render. Since Context is not exactly passed as props, any changes to the context value could cause React to not re-render all the components that consume it due to ShouldComponentUpdate. This can lead to issues with the application's performance and cause the context data to become outdated.

## 3. Describe 3 ways to pass information from a component to its PARENT.

**Lifting state up**: You can pass data from a child component to a parent component by updating the state variable stored in the parent component inside the child component.
Let's use an example to illustrate this. Say I have a parent component `ParentComponent.tsx` with a state variable and I create a `handleState` function to update the state variable. I pass this `handleState` function to the child component.

```javascript
const ParentComponent = () => {
  const [state, setState] = useState("");
  const handleState = (arg) => {
    setState(arg);
  };

  return <ChildComponent handleState={handleState} />;
};
```

In the child component, I can update the state value with an event listener, which will in turn update the parent component.

```javascript
const ChildComponent = ({ handleState }) => {
  return <div oncClick={handleState("change state")}> click me </div>;
};
```

When the div is clicked, the parent component state will be updated.

**useContext**: React provides a Context API hook that enables passing context data from a parent component to deeply nested children components. The `useContext` hook can be used by children components to consume the context data. Additionally, children comp`one`nts can update the context value using the provider's `set` function, similar to the `useState` hook.


## 4. Give two ways to prevent components from re-rendering.

**useMemo**: This React hook is used for caching to minimize calculations between renders, a process known as memoization. It only re-renders the component if there's an update in the props.

**useCallback**: This React hook accepts a function and caches the returned value. If there is no change in its dependencies on the next render, it returns the cached value.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is an empty jsx tag`<></>` that allows you to return two or more jsx elements without a wrapper element or parent element.

**Why do we need fragments**

Fragments come in handy when you need to build a component that may contain two or more components, and you don't want to add a div to wrap them. By using fragments, you can wrap the components so that they are returned as a single JSX element. This way, you won't add any extra elements to the DOM or affect the styling of the components.

```javascript
const someFunctionalComponent = () => (
  <>
    <InputComponent />
    <SuggestionComponent />
  </>
);
```

**where it might break my app.**

- If you are working with a list, you cannot pass `key` into the empty JSX tag `<></>`. That will break the app. You will have to change it to `<Fragment></Fragment>`.

- If you try to return more than one JSX element from a functional component, the app will break. To fix it, you can use the `Fragment` or `<></>` syntax.

## 6. Give three examples of the HOC pattern.

**Authentication and Authorization**

```javascript
const useAuth = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = checkAuthStatus();

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
};
```

**Catching and Memoization**

```javascript
export const withMemo = (WrappedComponent) => {
  return (props) => {
    const memoizedValue = useMemo(() => expensiveComputation(props), [props])

    return <WrappedComponent {...props} memoizedValue={memoizedValue} />;
  };
};
```

**Error Handling**

```javascript
const withErrorHandling = (WrappedComponent) => {
  return (props) => {
    return (
      <ErrorBoundary>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
};
```


## 7. What's the difference in handling exceptions in promises, callbacks and async…await?

**promises**: uses `.catch` to handle rejected or failed promises

```javascript
const promiseExample = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("error");
  }, 300);
});

promiseExample
  .then((result) => {
    // Handle successful resquest
  })
  .catch((error) => {
    console.error(error);
  });
```

**callbacks**: Uses an if statement to handle exceptions. It passes in the error as the first argument and checks if it exists in an if statement.

```javascript
callBackExample((error, result) => {
  if (error) {
    console.error(error);
  } else {
    // Handle successful request
  }
});
```

**async_await**: uses the trycatch block to handle its exceptions and asynchronous call failures. When the async-await asynchronous call throws an exception, it is caught in the catch block. In the example, we console the error value.

```javascript
const asyncAwaitExample = () => {
  try{
    const response = await fetchAPIData();
    // Handle successful request
  }.catch(error){
    console.error(error)
  }
}

```

## 8. How many arguments does setState take and why is it async.

**setState** is a function in React that is used to update the state of a component. It takes in one argument which is the new state that you want to set.

**setState** is an asynchronous function which means that when you call it and pass in an argument, it won't immediately update the state. Instead, it will save the updated state and update the DOM with the new state when the component is re-rendered.

## 9. List the steps needed to migrate a Class to a Function Component.

- change the class to a function
- remove constructor
- convert state properties and state updates to use `useState` and set the initial state value to this.state
- convert all methods to functions
- remove event handler bindings
- remove the render method and return the jsx element directly
- replace all react life cycle methods to use react hooks

## 10. List a few ways styles can be used with components.

- inline styles
- css modules
- css-in-js
- global css
- styled components
- tailwind css
- sass/less

## 11. How to render an HTML string coming from the server.

use `dangerouslySetInnerHTML`. It is react's version of using `innerHTML` DOM property in the browser.
