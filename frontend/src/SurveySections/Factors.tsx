import React from 'react';
const Factors = (props: any) => {
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
            <h2>Factors That Contribute to Suicide and/or Mental Illness</h2>
            <form className="section">
                <p>How frequently do you exercise?</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="exercise_always" name="exercise" value="Always" onChange={onValueSelected} />
                        <label htmlFor="exercise_always">Always</label><br />
                    </div>

                    <div className="radio-with-label">
                        <input type="radio" id="exercise_often" name="exercise" value="Often" onChange={onValueSelected} />
                        <label htmlFor="exercise_often">Often</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="exercise_sometimes" name="exercise" value="Sometimes" onChange={onValueSelected} />
                        <label htmlFor="exercise_sometimes">Sometimes</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="exercise_rarely" name="exercise" value="Rarely" onChange={onValueSelected} />
                        <label htmlFor="exercise_rarely">Rarely</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="exercise_never" name="exercise" value="Never" onChange={onValueSelected} />
                        <label htmlFor="exercise_never">Never</label>
                    </div>
                </div>

                <p>Does your gender identity match your sex assignment at birth?</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="gender_yes" name="gender" value="Yes" onChange={onValueSelected} />
                        <label htmlFor="gender_yes">Yes</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="gender_no" name="gender" value="No" onChange={onValueSelected} />
                        <label htmlFor="gender_no">No</label>
                    </div>
                </div>

                <p>Are you either employed or enrolled as a full-time student?</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="occupation_yes" name="occupation" value="Yes" onChange={onValueSelected} />
                        <label htmlFor="occupation_yes">Yes</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="occupation_no" name="occupation" value="No" onChange={onValueSelected} />
                        <label htmlFor="occupation_no">No</label>
                    </div>
                </div>

                <p>How is the quality of the healthcare in your community?</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="healthcare_verygood" name="healthcare" value="Very Good" onChange={onValueSelected} />
                        <label htmlFor="healthcare_verygood">Very Good</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="healthcare_good" name="healthcare" value="Good" onChange={onValueSelected} />
                        <label htmlFor="healthcare_good">Good</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="healthcare_fair" name="healthcare" value="Fair" onChange={onValueSelected} />
                        <label htmlFor="healthcare_fair">Fair</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="healthcare_poor" name="healthcare" value="Poor" onChange={onValueSelected} />
                        <label htmlFor="healthcare_poor">Poor</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="healthcare_verypoor" name="healthcare" value="Very Poor" onChange={onValueSelected} />
                        <label htmlFor="healthcare_verypoor">Very Poor</label>
                    </div>
                </div>
            </form>
        </>
    );
}
export default Factors;