module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'What is the name of the Component?'
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Where does the directory located (Optional)?',
      },
    ]
    return inquirer
      .prompt(questions)
      .then(answers => {
        const { component_name, dir } = answers
        const Component_name =  component_name.charAt(0).toUpperCase() + component_name.slice(1)
        const path = `${ dir ? `${dir}/` : `` }${Component_name}`
        const absPath = `src/components/${path}`
        return { ...answers, Component_name, path, absPath }
      })
  }
}