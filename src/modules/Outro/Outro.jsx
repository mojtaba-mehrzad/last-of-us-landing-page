export default function Outro() {
  return (
    <section id="ending" className="final-message">
      <div className="col-center gap-10 h-full">
        <div>
          <h3 className="gradient-title"> “Revenge won’t bring you peace.”</h3>
        </div>
        <div className="flex-center gap-10">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/ps-logo.svg`}
            alt="PlayStation"
            className="md:w-32 w-20"
          />
          <img
            src={`${import.meta.env.BASE_URL}assets/images/x-logo.svg`}
            alt="The Last of Us"
            className="md:w-52 w-40"
          />
        </div>
      </div>
    </section>
  );
}
