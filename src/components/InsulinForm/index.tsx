import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { type ChangeEvent, useCallback, useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { useRouter } from 'next/router'

interface FormData {
  id?: number
  nameInsulin?: string
  individualApplication?: boolean
  typesInsulin?: number
}

interface InsulinFormProps {
  initialValues?: FormData
}

export default function InsulinForm ({ initialValues }: InsulinFormProps): React.ReactElement {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    nameInsulin: '',
    individualApplication: false,
    typesInsulin: 0
  })

  useEffect(() => {
    if (initialValues?.id != null) {
      setFormData({
        nameInsulin: initialValues?.nameInsulin,
        individualApplication: initialValues?.individualApplication,
        typesInsulin: initialValues?.typesInsulin
      })
    }
  }, [initialValues])

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prevData) => {
        if (target.type === 'checkbox') {
          const checkboxTarget = target as HTMLInputElement
          return {
            ...prevData,
            [checkboxTarget.name]: checkboxTarget.checked
          }
        } else {
          return {
            ...prevData,
            [target.name]: target.value
          }
        }
      })
    },
    [setFormData]
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (formData.nameInsulin === '' || formData.typesInsulin === 0) {
        alert('Por favor preencha todos os campos.')
        return
      }

      let response = null

      if (initialValues?.id != null) {
        // Edit Insulin
        response = await fetch(`https://localhost:7041/api/v1/Insulin/${initialValues.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...formData, id: initialValues.id })
        })
      } else {
        // Create Insulin
        response = await fetch('https://localhost:7041/api/v1/Insulin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
      }

      if (response.ok) {
        setFormData({
          nameInsulin: '',
          individualApplication: false,
          typesInsulin: 0
        })
        await router.push('/insulin')
      } else {
        alert('Um erro ocorreu ao criar/editar a insulina.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Um erro ocorreu ao criar/editar a insulina.')
    }
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            {(initialValues != null) ? 'Editar Insulina' : 'Cadastrar Insulina'}
          </h1>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              handleSubmit(event).catch((error) => {
                console.error('Error in handleSubmit:', error)
              })
            }}
            className={styles.form}
          >
            <label htmlFor="nameInsulin" className={styles.label}>
              <span className={styles.labelText}>Nome</span>
              <input
                onChange={handleChange}
                name="nameInsulin"
                value={formData.nameInsulin}
                className={styles.input}
                type="text"
                required
              />
            </label>

            <label className={styles.label}>
              <span className={styles.labelText}>Aplicação Individual</span>
              <input
                onChange={handleChange}
                name="individualApplication"
                checked={formData.individualApplication ?? false}
                className={styles.checkbox}
                type="checkbox"
              />
            </label>

            <label className={styles.label}>
              <span className={styles.labelText}>Tipo de Insulina</span>
              <select
                className={styles.input}
                id="typesInsulin"
                name="typesInsulin"
                value={formData.typesInsulin}
                onChange={handleChange}
                required
              >
                <option value="">-</option>
                <option value="1">Ação Ultra-Rápida</option>
                <option value="2">Ação Rápida</option>
                <option value="3">Ação Intermediária</option>
                <option value="4">Ação Lenta</option>
              </select>
            </label>

            <button className={styles.saveButton} type="submit">Salvar</button>
          </form>
        </div>
      </main>
    </>
  )
}
