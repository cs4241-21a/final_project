import React from 'react';
const Treatment = (props: any) => {
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
            <h2>How Mental Illnesses Are Treated</h2>
            <form className="section">
                <p>Are you currently being treated for a common mental disorder (anxiety, depressive, or panic disorder)?</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="treatment_yes" name="treatment" value="Yes" onChange={onValueSelected} />
                        <label htmlFor="treatment_yes">Yes</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="treatment_no" name="treatment" value="No" onChange={onValueSelected} />
                        <label htmlFor="treatment_no">No, I have never been treated</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="treatment_no_past" name="treatment" value="Past" onChange={onValueSelected} />
                        <label htmlFor="treatment_no_past">No, but I have been treated in the past</label>
                    </div>
                </div>

                <h4>How important are the following factors in deciding not to seek help?</h4>

                <p>You are not sure available treatments are very effective.</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="avail_unimportant" name="avail" value="Unimportant" onChange={onValueSelected} />
                        <label htmlFor="avail_unimportant">Unimportant</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="avail_little" name="avail" value="Of little importance" onChange={onValueSelected} />
                        <label htmlFor="avail_little">Of little importance</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="avail_moderate" name="avail" value="Moderately important" onChange={onValueSelected} />
                        <label htmlFor="avail_moderate">Moderately important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="avail_important" name="avail" value="Important" onChange={onValueSelected} />
                        <label htmlFor="avail_important">Important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="avail_very" name="avail" value="Very important" onChange={onValueSelected} />
                        <label htmlFor="avail_very">Very important</label><br />
                    </div>
                </div>

                <p>You would want to handle the problem on your own.</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="handle_unimportant" name="handle" value="Unimportant" onChange={onValueSelected} />
                        <label htmlFor="handle_unimportant">Unimportant</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="handle_little" name="handle" value="Of little importance" onChange={onValueSelected} />
                        <label htmlFor="handle_little">Of little importance</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="handle_moderate" name="handle" value="Moderately important" onChange={onValueSelected} />
                        <label htmlFor="handle_moderate">Moderately important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="handle_important" name="handle" value="Important" onChange={onValueSelected} />
                        <label htmlFor="handle_important">Important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="handle_very" name="handle" value="Very important" onChange={onValueSelected} />
                        <label htmlFor="handle_very">Very important</label><br />
                    </div>
                </div>

                <p>You would be too embarrassed.</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="embarrassed_unimportant" name="embarrassed" value="Unimportant" onChange={onValueSelected} />
                        <label htmlFor="embarrassed_unimportant">Unimportant</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="embarrassed_little" name="embarrassed" value="Of little importance" onChange={onValueSelected} />
                        <label htmlFor="embarrassed_little">Of little importance</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="embarrassed_moderate" name="embarrassed" value="Moderately important" onChange={onValueSelected} />
                        <label htmlFor="embarrassed_moderate">Moderately important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="embarrassed_important" name="embarrassed" value="Important" onChange={onValueSelected} />
                        <label htmlFor="embarrassed_important">Important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="embarrassed_very" name="embarrassed" value="Very important" onChange={onValueSelected} />
                        <label htmlFor="embarrassed_very">Very important</label><br />
                    </div>
                </div>

                <p>You would talk to friends or relatives instead.</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="friends_unimportant" name="friends" value="Unimportant" onChange={onValueSelected} />
                        <label htmlFor="friends_unimportant">Unimportant</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="friends_unimportant" name="friends" value="Of little importance" onChange={onValueSelected} />
                        <label htmlFor="friends_unimportant">Of little importance</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="friends_unimportant" name="friends" value="Moderately important" onChange={onValueSelected} />
                        <label htmlFor="friends_unimportant">Moderately important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="friends_unimportant" name="friends" value="Important" onChange={onValueSelected} />
                        <label htmlFor="friends_unimportant">Important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="friends_unimportant" name="friends" value="Very important" onChange={onValueSelected} />
                        <label htmlFor="friends_unimportant">Very important</label><br />
                    </div>
                </div>

                <p>You think it costs too much money.</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="money_unimportant" name="money" value="Unimportant" onChange={onValueSelected} />
                        <label htmlFor="money_unimportant">Unimportant</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="money_little" name="money" value="Of little importance" onChange={onValueSelected} />
                        <label htmlFor="money_little">Of little importance</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="money_moderate" name="money" value="Moderately important" onChange={onValueSelected} />
                        <label htmlFor="money_moderate">Moderately important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="money_important" name="money" value="Important" onChange={onValueSelected} />
                        <label htmlFor="money_important">Important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="money_very" name="money" value="Very important" onChange={onValueSelected} />
                        <label htmlFor="money_very">Very important</label><br />
                    </div>
                </div>

                <p>You are unsure of where to go or who to see.</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="where_unimportant" name="where" value="Unimportant" onChange={onValueSelected} />
                        <label htmlFor="where_unimportant">Unimportant</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="where_little" name="where" value="Of little importance" onChange={onValueSelected} />
                        <label htmlFor="where_little">Of little importance</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="where_moderate" name="where" value="Moderately important" onChange={onValueSelected} />
                        <label htmlFor="where_moderate">Moderately important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="where_important" name="where" value="Important" onChange={onValueSelected} />
                        <label htmlFor="where_important">Important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="where_very" name="where" value="Very important" onChange={onValueSelected} />
                        <label htmlFor="where_very">Very important</label><br />
                    </div>
                </div>

                <p>You anticipate problems with time, transportation, or scheduling.</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="time_unimportant" name="time" value="Unimportant" onChange={onValueSelected} />
                        <label htmlFor="time_unimportant">Unimportant</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="time_little" name="time" value="Of little importance" onChange={onValueSelected} />
                        <label htmlFor="time_little">Of little importance</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="time_moderate" name="time" value="Moderately important" onChange={onValueSelected} />
                        <label htmlFor="time_moderate">Moderately important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="time_important" name="time" value="Important" onChange={onValueSelected} />
                        <label htmlFor="time_important">Important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="time_very" name="time" value="Very important" onChange={onValueSelected} />
                        <label htmlFor="time_very">Very important</label><br />
                    </div>
                </div>

                <p>You are afraid it might harm your school or professional career.</p>
                <div className="question-group">
                    <div className="radio-with-label">
                        <input type="radio" id="harm_unimportant" name="harm" value="Unimportant" onChange={onValueSelected} />
                        <label htmlFor="harm_unimportant">Unimportant</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="harm_little" name="harm" value="Of little importance" onChange={onValueSelected} />
                        <label htmlFor="harm_little">Of little importance</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="harm_moderate" name="harm" value="Moderately important" onChange={onValueSelected} />
                        <label htmlFor="harm_moderate">Moderately important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="harm_important" name="harm" value="Important" onChange={onValueSelected} />
                        <label htmlFor="harm_important">Important</label><br />
                    </div>
                    <div className="radio-with-label">
                        <input type="radio" id="harm_very" name="harm" value="Very important" onChange={onValueSelected} />
                        <label htmlFor="harm_very">Very important</label><br />
                    </div>
                </div>
            </form >
        </div>
    );
}
export default Treatment;
