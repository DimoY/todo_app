import { Formik,Field,Form } from "formik";
import {  useHistory } from "react-router-dom";
import { useContext } from "react";
import { Setings } from "./settingsContext";
/**
*
*@brief
* Settings component
*/

export function Settings(params) {
  const settingsContext = useContext(Setings)
  let history = useHistory()
  return(
        <div>
    <h1>Settings</h1>
    <Formik
      initialValues={{
        Leaderboard: settingsContext.Leaderboard,
        ReactLogo:settingsContext.ReactLogo,
      }}
      onSubmit={async (values) => {
        params.setReactLogo(values.ReactLogo)
        params.setLeaderboard(values.Leaderboard)
        history.push("/")
        console.log(values.ReactLogo)
      }}
    >
      {({ values }) => (
        <Form>
          {/* 
            This first checkbox will result in a boolean value being stored. Note that the `value` prop
            on the <Field/> is omitted
          */}
          <label>
            <Field type="checkbox" name="Leaderboard" />
            Leaderboard
          </label>
          <br/>
          <label>
            <Field type="checkbox" name="ReactLogo" />
            ReactLogo
          </label>
          <br/>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
    )
}