import { ErrorMessage } from '@hookform/error-message'
import React, { InputHTMLAttributes } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors
  error?: FieldError
  label: string
  id: string
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="font-montserrat font-medium text-white"
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        {...props}
        className={`rounded-lg bg-gray900 font-medium border border-transparent placeholder:text-gray600 placeholder:font-regular text-white py-3 px-8 focus:outline-none hover:bg-gray900/60 focus:border-pink500 transition duration-500 ${
          props.error ? `border-red-500` : ''
        }`}
        ref={ref}
        id={props.id}
      />
      {props.error ? (
        <ErrorMessage
          errors={props.errors}
          name={props.id}
          message={props.error.message}
          render={() => (
            <p className="text-red-500 text-sm font-montserrat">
              {props.error?.message}
            </p>
          )}
        />
      ) : null}
    </div>
  )
})

export default Input
