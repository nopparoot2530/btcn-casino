export default function ErrorSnackbarContent({ data }) {
    return (
        <ul>
            {
                Object.entries(data).map(errorGroup => {
                    return errorGroup[1].map(error => (<li>{error}</li>))
                })
            }
        </ul>
    )
}