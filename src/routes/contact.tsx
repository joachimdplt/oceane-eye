import { createFileRoute } from '@tanstack/react-router'
import { Questions } from '~/components/landing/Questions'
import { blockTitles, contact, faq, pageMeta } from '~/data/content'
import { SITE_URL, canonical, seo } from '~/utils/seo'

/**
 * La page de contact : les trois adresses, puis les questions fréquentes.
 *
 * Les questions viennent APRÈS l'adresse et non avant : quelqu'un qui arrive
 * ici a déjà décidé d'écrire, et lui opposer une liste de questions avant de lui
 * donner l'adresse le ferait repartir.
 */
export const Route = createFileRoute('/contact')({
  head: () => {
    const url = `${SITE_URL}/contact`
    return {
      meta: [...seo({ ...pageMeta.contact, url })],
      links: [canonical(url)],
    }
  },
  component: ContactPage,
})

function ContactPage() {
  return (
    <main>
      <Questions title={blockTitles.questions} faq={faq} />
    </main>
  )
}
