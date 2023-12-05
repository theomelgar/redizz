const Button = (
  ({ className , ...props }) => {
    return (
      <button
        className={"inline-flex items-center justify-center whitespace-nowrap rounded-md  text-xl font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"+className}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export {Button}