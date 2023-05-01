import { map } from 'ramda'
import React, { FC } from 'react'

interface InteractionStepsProps {
  steps: { id: string; action: string; description: string }[]
}

export const InteractionSteps: FC<InteractionStepsProps> = ({ steps }) => {
  return (
    <div className="p-6">
      <h1 className="mb-12">Steps:</h1>
      <ul>
        {map((step: { id: string; action: string; description: string }) => (
          <li key={step.id} className="mb-8">
            <h2 className="text-xl mb-0">{step.action}</h2>
            <p className="text-gray-600 text-lg">{step.description}</p>
          </li>
        ))(steps)}
      </ul>
    </div>
  )
}
