import React from 'react';
const Prevention = (props: any) => {
    const setData = props.dataCallback;
    const data = props.data;
    const onValueSelected = (event: any) => {
        const { name, value } = event.target;
        const newData = { ...data };
        newData[name] = value;
        setData(newData);
    }
    return (
        <>
            <h2>Suicide Prevention Methods</h2>
            <form className="section">
                <p>Are you willing to help prevent suicides in your community?</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="willing_yes" name="willing" value="Yes" onChange={onValueSelected} />
                        <label htmlFor="willing_yes">Yes</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="willing_no" name="willing" value="No" onChange={onValueSelected} />
                        <label htmlFor="willing_no">No</label>
                    </div>
                </div>

                <p>Do you have your country’s suicide hotline saved on your phone? (if applicable)</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="number_yes" name="number" value="Yes" onChange={onValueSelected} />
                        <label htmlFor="number_yes">Yes</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="number_no" name="number" value="No" onChange={onValueSelected} />
                        <label htmlFor="number_no">No</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="number_na" name="number" value="Not Applicable" onChange={onValueSelected} />
                        <label htmlFor="number_na">Not Applicable</label>
                    </div>
                </div>

                <p>How often are you engaged with your community?</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="engaged_always" name="engaged" value="Always" onChange={onValueSelected} />
                        <label htmlFor="engaged_always">Always</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="engaged_often" name="engaged" value="Often" onChange={onValueSelected} />
                        <label htmlFor="engaged_often">Often</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="engaged_sometimes" name="engaged" value="Sometimes" onChange={onValueSelected} />
                        <label htmlFor="engaged_sometimes">Sometimes</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="engaged_rarely" name="engaged" value="Rarely" onChange={onValueSelected} />
                        <label htmlFor="engaged_rarely">Rarely</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="engaged_never" name="engaged" value="Never" onChange={onValueSelected} />
                        <label htmlFor="engaged_never">Never</label>
                    </div>
                </div>

                <p>Does your community/country have a suicide prevention plan?</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="plan_yes" name="plan" value="Yes" onChange={onValueSelected} />
                        <label htmlFor="plan_yes">Yes</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="plan_maybe" name="plan" value="Maybe" onChange={onValueSelected} />
                        <label htmlFor="plan_maybe">Maybe</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="plan_no" name="plan" value="No" onChange={onValueSelected} />
                        <label htmlFor="plan_no">No</label>
                    </div>
                </div>
            </form>
        </>
    );
}
export default Prevention;
