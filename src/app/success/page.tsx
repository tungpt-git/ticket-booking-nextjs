import { Card } from "@/components";

export default async function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <div className="p-8 max-w-md text-center">
          <span className="text-[64px] text-success inline-block">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="check-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path>
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
            </svg>
          </span>
          <h1 className="text-2xl font-bold">Đặt chỗ thành công!</h1>
          <p className="mt-4">
            Cảm ơn bạn đã đặt chỗ. Email xác nhận sẽ được gửi đến địa chỉ email
            của bạn trong vòng 24h
          </p>

          <a
            href="/booking"
            className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Trở về màn hình chính
          </a>
        </div>
      </Card>
    </div>
  );
}
