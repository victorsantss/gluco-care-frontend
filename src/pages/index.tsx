import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { ChangeEvent, useCallback, useState } from 'react'

export default function Home() {
  const [ formData, setFormData ] = useState({
    nameInsulin: '',
    individualApplication: false,
    typesInsulin: []
  });

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prevData) => {
        if (target.type === 'checkbox') {
          const checkboxTarget = target as HTMLInputElement;
          return {
            ...prevData,
            [checkboxTarget.name]: checkboxTarget.checked,
          };
        } else if (target.type === 'select-one') {
          const selectTarget = target as HTMLSelectElement;
          const selectedOptions = Array.from(selectTarget.selectedOptions).map((option) => option.value);
          return {
            ...prevData,
            [target.name]: selectedOptions,
          };
        } else {
          return {
            ...prevData,
            [target.name]: target.value,
          };
        }
      });
    },
    [setFormData],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!formData.nameInsulin || !formData.typesInsulin) {
        alert('Por favor preencha todos os campos.');
        return;
      }

      const response = await fetch('https://localhost:7041/api/v1/Insulin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Insulina criada com sucesso!');
        setFormData({
          nameInsulin: '',
          individualApplication: false,
          typesInsulin: []
        });
      } else {
        alert(data.message || 'Um erro ocorreu ao criar a insulina.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Um erro ocorreu ao criar a insulina.');
    }
  }


  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Image src="/logo.png" alt="Logo" width={264} height={79} />
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Cadastrar Insulina</h1>
          <form 
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <label htmlFor="nameInsulin" className={styles.label}>
              <span className={styles.labelText}>Nome</span>
              <input onChange={handleChange} name="nameInsulin" className={styles.input} type="text" required />
            </label>

            <label className={styles.label}>
              <span className={styles.labelText}>Aplicação Individual</span>
              <input onChange={handleChange} name="individualApplication" className={styles.checkbox} type="checkbox" />
            </label>

            <label className={styles.label}>
              <span className={styles.labelText}>Tipo de Insulina</span>
              <select 
                className={styles.input} 
                id="typesInsulin" 
                name="typesInsulin" 
                defaultValue={''}
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
