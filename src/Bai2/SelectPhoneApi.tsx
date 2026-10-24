import React, { useCallback, useEffect, useState } from "react";
import { Phone } from "../types";
import { fetchPhones } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "../Bai1/SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);

    try {
      const phones = await fetchPhones();

      if (phones.length === 0) {
        throw new Error("API chưa có sản phẩm nào.");
      }

      setPhone(phones[0]);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Đã xảy ra lỗi khi tải dữ liệu."
      );
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  if (!phone) {
    return <Loading />;
  }

  return <SelectPhoneApp phone={phone} />;
}