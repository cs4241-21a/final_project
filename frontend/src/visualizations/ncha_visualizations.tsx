import NCHAAttemptedSuicide from "./ncha_attempted_suicide";
import NCHAConsideredSuicide from "./ncha_considered_suicide";
import NCHADepressedFunction from "./ncha_felt_depressed_difficult_to_function";
import NCHAFeltOverwhelmed from "./ncha_felt_overwhelmed_by_all_to_do";
import NCHAFeltOverwhelmingAnger from "./ncha_felt_overwhelming_anger";
import NCHAFeltThingsWereHopeless from "./ncha_felt_things_were_hopeless";
import NCHAFeltVeryLonely from "./ncha_felt_very_lonely";
import NCHAFeltVerySad from "./ncha_felt_very_sad";
import NCHAMentallyExhausted from "./ncha_felt_mentally_exhausted_data";
import NCHASelfHarm from "./ncha_self_harm";
import NCHAFeltOverwhelmingAnxiety from "./ncha_felt_overwhelming_anxiety";

const NCHAVisualizations = (props: any) => {
    return (
        <>
            <div>
                <h2>
                    Student Responses to National College Health Assessment
                </h2>
                <p>
                    Mental health issues can be especially prevalent in the stressful environment of college.
                    In 2019, the American College Health Association conducted a survey of approximately 70,000 college
                    students across the United States. As part of this survey, students were asked to state whether they
                    had felt or done certain things in the last 2 weeks, last 30 days, last 12 months, prior to the last
                    12 months, or never.
                </p>
                <NCHAFeltThingsWereHopeless />
                <br />
                <NCHAFeltOverwhelmed />
                <br />
                <NCHAMentallyExhausted />
                <br />
                <NCHAFeltVeryLonely />
                <br />
                <NCHAFeltVerySad />
                <br />
                <NCHADepressedFunction />
                <br />
                <NCHAFeltOverwhelmingAnxiety />
                <br />
                <NCHAFeltOverwhelmingAnger />
                <br />
                <NCHAConsideredSuicide />
                <br />
                <NCHAAttemptedSuicide />
                <br />
                <NCHASelfHarm />
                <br />
                <p>
                    From this data, it's clear that many college students struggle with mental health issues; in 2019,
                    87% of surveyed college students said they felt overwhelmed by all they had to do in the past year. Additionally,
                    66% said they felt overwhelming anxiety, and 13% had seriously considered suicide. Colleges need to
                    find ways to address these issues to improve student mental health.
                </p>
                <p>
                    Professor Marty Becker from Florida State University and the American Psychological Association states
                    that there are 4 primary strategies colleges should use to improve student mental health. First, colleges
                    should empower students to learn more about their mental health, and provide training for skills such as
                    mindfulness and time management. Second, colleges should provide stress-management resources to students, such
                    as coaches, advisors, and counselors, as well as a platform for peer-to-peer support groups. Next, colleges
                    should study which factors contribute most highly to stress - such as discrimination, substance use, and
                    pressure from classes - and work to reduce their impact. Finally, colleges should launch wellness campaigns
                    to train students and faculty to recognize when others are in distress and to intervene when possible.
                </p>
                <p>Sources:</p>
                <p><a href="https://www.acha.org/documents/ncha/NCHA-II_SPRING_2019_US_REFERENCE_GROUP_EXECUTIVE_SUMMARY.pdf">
                    American College Health Association || National College Health Assessment</a></p>
                <p><a href="https://theconversation.com/the-mental-health-crisis-on-campus-and-how-colleges-can-fix-it-127875">
                    The Conversation || The mental health crisis on campus and how colleges can fix it</a></p>
            </div>
        </>
    )
}

export default NCHAVisualizations;