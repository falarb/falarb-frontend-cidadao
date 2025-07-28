import './styles.css';

export default function MainContainer ( { children, menuIsOpen } ) {
    return <div className={`main-container  main-container-${ menuIsOpen ? 'menu-is-close' : 'menu-is-open'}`}>{children}</div>
}