import React, { useState } from 'react'

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);

  const Icon = (<i className={visible ? "fas fa-eye" : "	fas fa-eye-slash "}
    onClick={() => setVisible(visibility => !visibility)} />)
  const InputType = visible ? "text" : "password";

  return [InputType, Icon]
}

export default usePasswordToggle