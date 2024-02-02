import { FC, useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface ToggleProps {
  label: string
  description: string
  onToggle: (enabled: boolean) => void
  disabled?: boolean
  initialState?: boolean
}

export const Toggle: FC<ToggleProps> = ({ label, description, onToggle, disabled, initialState = false }) => {
  const [enabled, setEnabled] = useState(initialState)

  const onChange = (enabled: boolean) => {
    if (disabled) {
      return
    }

    setEnabled(enabled)
    onToggle(enabled)
  }

  return (
    <Switch.Group as="div" className="flex items-center justify-between mb-2">
      <span className="flex flex-grow flex-col w-full">
        <Switch.Label as="span" className="text-lg font-bold leading-6 text-gray-900 " passive>
          {label}
        </Switch.Label>
        {description && (
          <Switch.Description as="span" className="text-sm text-gray-500">
            {description}
          </Switch.Description>
        )}
      </span>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={classNames(
          enabled && !disabled ? 'bg-yellow' : disabled ? 'bg-yellow' : 'bg-gray-200',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          !disabled ? 'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2' : '',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ',
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
    </Switch.Group>
  )
}
