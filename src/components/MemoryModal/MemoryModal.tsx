import styles from './MemoryModal.module.css'

export const MemoryModal = () => {
  return (
    <div>
      <div className={styles.modalBackdrop} />
      <div className={styles.modal}>Level 1</div>
    </div>
  )
}
