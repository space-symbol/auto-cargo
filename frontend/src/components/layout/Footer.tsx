
export default function Footer() {
  return (
    <footer className="bg-company-dark text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-company-primary flex items-center justify-center text-white font-bold">
                ТВ
              </div>
              <span className="font-bold text-white">
                ТРЭНС ВЭСТОР
              </span>
            </div>
            <p className="text-company-light/80 max-w-xs">
              Надежная транспортная компания с многолетним опытом грузоперевозок по всей России и международным направлениям.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-company-primary/30 text-center text-company-light/60 text-sm">
          &copy; {new Date().getFullYear()} ООО "ТРЭНС ВЭСТОР". Все права защищены.
        </div>
      </div>
    </footer>
  );
}
