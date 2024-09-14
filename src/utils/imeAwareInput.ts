import { ref } from "vue";

interface IMEAwareInputOptions {
  // eslint-disable-next-line no-unused-vars
  onInput?: (text: string) => void;
  // eslint-disable-next-line no-unused-vars
  onEnter?: (text: string) => void;
  onCompositionStart?: () => void;
  onCompositionEnd?: () => void;
}

export function useIMEAwareInput(options: IMEAwareInputOptions) {
  const isComposing = ref(false);
  const inputValue = ref("");
  let compositionEndJustFinished = false;

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    inputValue.value = target.value;

    if (!isComposing.value && !compositionEndJustFinished && options.onInput) {
      options.onInput(inputValue.value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === "Enter" &&
      !isComposing.value &&
      !compositionEndJustFinished
    ) {
      if (options.onEnter) {
        options.onEnter(inputValue.value);
      }
      event.preventDefault(); // 防止表單提交
    }
  };

  const handleCompositionStart = () => {
    isComposing.value = true;
    console.log("handleCompositionStart");
    if (options.onCompositionStart) {
      options.onCompositionStart();
    }
  };

  const handleCompositionEnd = () => {
    isComposing.value = false;
    compositionEndJustFinished = true;

    if (options.onCompositionEnd) {
      options.onCompositionEnd();
    }

    if (options.onInput) {
      options.onInput(inputValue.value);
    }
    console.log("handleCompositionEnd");
    // 使用 nextTick 或 setTimeout 來重置 compositionEndJustFinished
    setTimeout(() => {
      console.log("reset compositionEndJustFinished");
      compositionEndJustFinished = false;
    }, 200);
  };

  return {
    inputValue,
    isComposing,
    handleInput,
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd
  };
}
