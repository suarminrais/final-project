import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createQuestion from "app/questions/mutations/createQuestion"
import QuestionForm from "app/questions/components/QuestionForm"

const NewQuestionPage: BlitzPage = () => {
  const router = useRouter()
  const [createQuestionMutation] = useMutation(createQuestion)

  return (
    <div>
      <h1>Create New Question</h1>

      <QuestionForm
        initialValues={{}}
        onSubmit={async (e) => {
          try {
            const question = await createQuestionMutation({
              data: {
                text: e.target[0].value,
                choices: {
                  create: [
                    { text: e.target[1].value },
                    { text: e.target[2].value },
                    { text: e.target[3].value },
                  ],
                },
              },
            })
            alert("Success!" + JSON.stringify(question))
            router.push(`/questions/${question.id}`)
          } catch (error) {
            alert("Error creating question " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/questions">
          <a>Questions</a>
        </Link>
      </p>
    </div>
  )
}

NewQuestionPage.getLayout = (page) => <Layout title={"Create New Question"}>{page}</Layout>

export default NewQuestionPage
