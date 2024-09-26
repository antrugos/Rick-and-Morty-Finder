type Props = {
    name: string,
    characterId: string,
    handleRestore: () => void,
}

const Deleted = ({ name, characterId, handleRestore }: Props) => {
    return (
        <main id="character">
            <div className="deletedMessage">
                <p>The character <strong>{name}</strong> identified with id <strong>{characterId}</strong> has been <span className="deletedStatus">deleted!</span></p>
                <button onClick={handleRestore} className="restoreButton">Restore Character</button>
            </div>
        </main>
    )
}

export default Deleted;