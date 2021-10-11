import React from 'react';
const PHQ9 = (props: any) => {
    const setData = props.dataCallback;
    const data = props.data;
    const onValueSelected = (event: any) => {
        const { name, value } = event.target;
        const newData = { ...data };
        newData[name] = value;
        setData(newData);
    }
    return (
        <div className="section">
            <h2>PHQ-9</h2>
            <div style={{ marginBottom: "2em" }}>The PHQ-9 is a short questionnaire that is often used by doctors to assess depression symptoms in a patient.</div>
            <br />
            <h4 style={{ textAlign: "center" }}>Over the last 2 weeks, how often have you been bothered by any of the following problems?</h4>
            <form className="section">
                <p>Little interest or pleasure in doing things</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="pleasure_0" name="pqh9-pleasure" value="0" onChange={onValueSelected} />
                        <label htmlFor="pleasure_always">Not At all</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="pleasure_1" name="pqh9-pleasure" value="1" onChange={onValueSelected} />
                        <label htmlFor="pleasure_1">Several days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="pleasure_2" name="pqh9-pleasure" value="2" onChange={onValueSelected} />
                        <label htmlFor="pleasure_2">More than half the days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="pleasure_3" name="pqh9-pleasure" value="3" onChange={onValueSelected} />
                        <label htmlFor="pleasure_3">Nearly every day</label><br />
                    </div>
                </div>

                <p>Feeling down, depressed, or hopeless</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="depressed_0" name="pqh9-depressed" value="0" onChange={onValueSelected} />
                        <label htmlFor="depressed_always">Not At all</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="depressed_1" name="pqh9-depressed" value="1" onChange={onValueSelected} />
                        <label htmlFor="depressed_1">Several days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="depressed_2" name="pqh9-depressed" value="2" onChange={onValueSelected} />
                        <label htmlFor="depressed_2">More than half the days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="depressed_3" name="pqh9-depressed" value="3" onChange={onValueSelected} />
                        <label htmlFor="depressed_3">Nearly every day</label><br />
                    </div>
                </div>

                <p>Trouble falling or staying asleep, or sleeping too much</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="sleep_0" name="pqh9-sleep" value="0" onChange={onValueSelected} />
                        <label htmlFor="sleep_always">Not At all</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="sleep_1" name="pqh9-sleep" value="1" onChange={onValueSelected} />
                        <label htmlFor="sleep_1">Several days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="sleep_2" name="pqh9-sleep" value="2" onChange={onValueSelected} />
                        <label htmlFor="sleep_2">More than half the days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="sleep_3" name="pqh9-sleep" value="3" onChange={onValueSelected} />
                        <label htmlFor="sleep_3">Nearly every day</label><br />
                    </div>
                </div>

                <p>Feeling tired or having little energy</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="tired_0" name="pqh9-tired" value="0" onChange={onValueSelected} />
                        <label htmlFor="tired_always">Not At all</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="tired_1" name="pqh9-tired" value="1" onChange={onValueSelected} />
                        <label htmlFor="tired_1">Several days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="tired_2" name="pqh9-tired" value="2" onChange={onValueSelected} />
                        <label htmlFor="tired_2">More than half the days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="tired_3" name="pqh9-tired" value="3" onChange={onValueSelected} />
                        <label htmlFor="tired_3">Nearly every day</label><br />
                    </div>
                </div>

                <p>Poor appetite or overeating</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="appetite_0" name="pqh9-appetite" value="0" onChange={onValueSelected} />
                        <label htmlFor="appetite_always">Not At all</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="appetite_1" name="pqh9-appetite" value="1" onChange={onValueSelected} />
                        <label htmlFor="appetite_1">Several days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="appetite_2" name="pqh9-appetite" value="2" onChange={onValueSelected} />
                        <label htmlFor="appetite_2">More than half the days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="appetite_3" name="pqh9-appetite" value="3" onChange={onValueSelected} />
                        <label htmlFor="appetite_3">Nearly every day</label><br />
                    </div>
                </div>

                <p>Feeling bad about yourself or that you are a failure or have let yourself or your family down</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="failure_0" name="pqh9-failure" value="0" onChange={onValueSelected} />
                        <label htmlFor="failure_always">Not At all</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="failure_1" name="pqh9-failure" value="1" onChange={onValueSelected} />
                        <label htmlFor="failure_1">Several days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="failure_2" name="pqh9-failure" value="2" onChange={onValueSelected} />
                        <label htmlFor="failure_2">More than half the days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="failure_3" name="pqh9-failure" value="3" onChange={onValueSelected} />
                        <label htmlFor="failure_3">Nearly every day</label><br />
                    </div>
                </div>

                <p>Trouble concentrating on things, such as reading the newspaper or watching television</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="concentrating_0" name="pqh9-concentrating" value="0" onChange={onValueSelected} />
                        <label htmlFor="concentrating_always">Not At all</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="concentrating_1" name="pqh9-concentrating" value="1" onChange={onValueSelected} />
                        <label htmlFor="concentrating_1">Several days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="concentrating_2" name="pqh9-concentrating" value="2" onChange={onValueSelected} />
                        <label htmlFor="concentrating_2">More than half the days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="concentrating_3" name="pqh9-concentrating" value="3" onChange={onValueSelected} />
                        <label htmlFor="concentrating_3">Nearly every day</label><br />
                    </div>
                </div>

                <p style={{ textAlign: "center" }}>Moving or speaking so slowly that other people could have noticed. Or the opposite being so figety or restless that you have been moving around a lot more than usual </p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="slowly_0" name="pqh9-slowly" value="0" onChange={onValueSelected} />
                        <label htmlFor="slowly_always">Not At all</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="slowly_1" name="pqh9-slowly" value="1" onChange={onValueSelected} />
                        <label htmlFor="slowly_1">Several days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="slowly_2" name="pqh9-slowly" value="2" onChange={onValueSelected} />
                        <label htmlFor="slowly_2">More than half the days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="slowly_3" name="pqh9-slowly" value="3" onChange={onValueSelected} />
                        <label htmlFor="slowly_3">Nearly every day</label><br />
                    </div>
                </div>

                <p>Thoughts that you would be better off dead, or of hurting yourself</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="suicide_0" name="pqh9-suicide" value="0" onChange={onValueSelected} />
                        <label htmlFor="suicide_always">Not At all</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="suicide_1" name="pqh9-suicide" value="1" onChange={onValueSelected} />
                        <label htmlFor="suicide_1">Several days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="suicide_2" name="pqh9-suicide" value="2" onChange={onValueSelected} />
                        <label htmlFor="suicide_2">More than half the days</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="suicide_3" name="pqh9-suicide" value="3" onChange={onValueSelected} />
                        <label htmlFor="suicide_3">Nearly every day</label><br />
                    </div>
                </div>




            </form>
        </div>
    );
}
export default PHQ9;