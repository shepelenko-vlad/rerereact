import "./VinInput.css";

function VinInput({ setVinValueInput, vinValueInput, onVinInputSubmit }) {
    const onVinInputChange = (e) => {
        setVinValueInput(e.target.value);
    };

    return (
        <div className="vin-input-wrapper">
            <form onSubmit={onVinInputSubmit}>
                <input
                    type='text'
                    placeholder='Enter Your VIN'
                    value={vinValueInput}
                    onChange={onVinInputChange}
                />
                <input type='submit' value='Decrypt' />
            </form>
        </div>
    );
}

export default VinInput;