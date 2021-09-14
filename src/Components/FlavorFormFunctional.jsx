import { useState } from "react";

function FlavorFormFunctional() {
  const [value, setValue] = useState("coconut");

  // это называется "стрелочная функция"
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // классический синтаксис для описания функции
  // function handleChange(event) {
  //   setValue(event.target.value)
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Your favorite flavor is: " + value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        (Functional Component) Pick your favorite flavor:
        <select value={value} onChange={handleChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default FlavorFormFunctional;
