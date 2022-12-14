import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { LOCAL_STORAGE_KEY } from "./constants";

describe("App.list", () => {
  afterEach(() => {
    globalThis.localStorage.clear();
  });

  it("페이지 접속시 기존에 추가된 완료되지 않은 todo 목록이 노출돼야 한다.", () => {
    // given
    globalThis.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem Ipsum" },
          { key: "2", value: "Dolor Sit", isComplete: true },
          { key: "3", value: "Amet" },
        ],
      })
    );

    // when
    render(<App />);

    // then
    const list = screen.getByTestId("list");
    expect(list).toHaveTextContent("Lorem Ipsum");
    expect(list).not.toHaveTextContent("Dolor Sit");
    expect(list).toHaveTextContent("Amet");
  });

  it("페이지 접속시 파싱할 수 없는 데이터가 저장소에 저장된 경우 빈 todo 목록이 노출돼야 한다.", () => {
    // given
    globalThis.localStorage.setItem(LOCAL_STORAGE_KEY, "이것도 해석해보시지!");

    // when
    render(<App />);

    // then
    const list = screen.getByTestId("list");
    expect(list).toBeInTheDocument();
  });

  it("페이지 접속시 key나 value가 없는 데이터가 저장소에 저장된 경우 todo 목록에 추가되면 안 된다.", () => {
    // given
    globalThis.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem" },
          { value: "Ipsum" },
          { key: "3", value: "Dolor" },
          { key: "4" },
        ],
      })
    );

    // when
    render(<App />);

    // then
    const list = screen.getByTestId("list");
    expect(list).toHaveTextContent("Lorem");
    expect(list).not.toHaveTextContent("Ipsum");
    expect(list).toHaveTextContent("Dolor");

    const items = screen.getAllByTestId("list-item");
    expect(items).toHaveLength(2);
  });

  it("삭제 버튼 클릭시 해당 todo가 목록에서 삭제돼야 한다.", () => {
    // given
    globalThis.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem Ipsum" },
          { key: "2", value: "Dolor Sit", isComplete: true },
          { key: "3", value: "Amet" },
        ],
      })
    );
    render(<App />);

    // when
    const removeButton = screen.getByTestId("list-item-remove-3");
    fireEvent.click(removeButton);

    // then
    const list = screen.getByTestId("list");
    expect(list).not.toHaveTextContent("Amet");
  });

  it("삭제 버튼 클릭시 해당 todo가 저장소에서 삭제돼야 한다.", () => {
    // given
    globalThis.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem Ipsum" },
          { key: "2", value: "Dolor Sit", isComplete: true },
          { key: "3", value: "Amet" },
        ],
      })
    );
    render(<App />);

    // when
    const removeButton = screen.getByTestId("list-item-remove-3");
    fireEvent.click(removeButton);

    // then
    expect(globalThis.localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem Ipsum" },
          { key: "2", value: "Dolor Sit", isComplete: true },
        ],
      })
    );
  });

  it("완료 버튼 클릭시 해당 todo가 할 일 목록에서 삭제돼야 한다.", () => {
    // given
    globalThis.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem Ipsum" },
          { key: "2", value: "Dolor Sit", isComplete: true },
          { key: "3", value: "Amet" },
        ],
      })
    );
    render(<App />);

    // when
    const removeButton = screen.getByTestId("list-item-remove-3");
    fireEvent.click(removeButton);

    // then
    const list = screen.getByTestId("list");
    expect(list).not.toHaveTextContent("Amet");
  });

  it("완료 버튼 클릭시 해당 todo가 저장소에서 완료 항목으로 저장돼야 한다.", () => {
    // given
    globalThis.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem Ipsum" },
          { key: "2", value: "Dolor Sit", isComplete: true },
          { key: "3", value: "Amet" },
        ],
      })
    );
    render(<App />);

    // when
    const completeButton = screen.getByTestId("list-item-complete-3");
    fireEvent.click(completeButton);

    // then
    expect(globalThis.localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem Ipsum" },
          { key: "2", value: "Dolor Sit", isComplete: true },
          { key: "3", value: "Amet", isComplete: true },
        ],
      })
    );
  });

  it("완료된 항목의 완료 버튼 클릭시 해당 todo가 저장소에서 미완료 항목으로 저장돼야 한다.", () => {
    // given
    globalThis.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem Ipsum" },
          { key: "2", value: "Dolor Sit", isComplete: true },
          { key: "3", value: "Amet" },
        ],
      })
    );
    render(<App />);
    const showCompleteCheckbox = screen.getByTestId("list-show-complete");
    fireEvent.click(showCompleteCheckbox);

    // when
    const completeButton = screen.getByTestId("list-item-complete-2");
    fireEvent.click(completeButton);

    // then
    expect(globalThis.localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
      JSON.stringify({
        data: [
          { key: "1", value: "Lorem Ipsum" },
          { key: "2", value: "Dolor Sit", isComplete: false },
          { key: "3", value: "Amet" },
        ],
      })
    );
  });
});
