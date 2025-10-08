
export default function Intro() {
  return (
   <section className="entrance-message">
      <div className="h-full col-center gap-10">
        <img src={`${import.meta.env.BASE_URL}assets/images/hero2.png`} className="w-full h-full object-cover" />

        <div className="flex-center bottom-12 absolute gap-10">
          <img src={`${import.meta.env.BASE_URL}assets/images/ps-logo.svg`} className="md:w-32 w-20" />
          <img src={`${import.meta.env.BASE_URL}assets/images/x-logo.svg`} className="md:w-52 w-40" />
        </div>
      </div>
    </section>
  )
}
