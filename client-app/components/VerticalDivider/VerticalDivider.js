import styles from './VerticalDivider.module.scss';

export default function VerticalDivider({color}){
    return (
        <div className={styles.divider} style={{background: color}}></div>
    )
}