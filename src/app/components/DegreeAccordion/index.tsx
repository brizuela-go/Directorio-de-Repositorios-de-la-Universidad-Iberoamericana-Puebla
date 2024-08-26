import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Degree } from 'src/payload-types'
import clsx from 'clsx'

type Props = {
  degrees: Degree[]
}

export default function DegreeAccordion({ degrees }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {degrees.map(({ id, title, description }) => (
        <div key={id} className={clsx('flex flex-col items-center')}>
          <Accordion type="single" collapsible>
            <AccordionItem value={id}>
              <AccordionTrigger className="text-xl md:text-2xl font-light text-primary">
                {title}
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-base font-light  tracking-tight">
                {description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  )
}
