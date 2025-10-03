import GenericEntityPage from "@/components/generic/genericEntityPage";
import {
  useTransactionItemCreate,
  useTransactionItemUpdate,
  useTransactionItemDelete,
} from "@/hooks/queries/useTransactionItems";
import { useAllItems } from "@/hooks/queries/useItems";

export default function TransactionItemsPage({
  transactionItems,
  transactionId,
  refetch,
}) {
  const { data: itemsData } = useAllItems();

  const itemOptions = (itemsData || []).map((item) => ({
    value: item.id,
    label: item.name_fa || item.name,
  }));
  const createMutation = useTransactionItemCreate();

  const wrappedCreate = {
    ...createMutation,
    mutate: (data, options) => {
      const defaults = {
        weight_count: 0,
        unit_price: 0,
        karat: 0,
        ojrat: 0,
        profit: 0,
        tax: 0,
      };

      const cleanedData = Object.keys(defaults).reduce(
        (acc, key) => {
          acc[key] =
            data[key] && data[key].toString().trim() !== ""
              ? data[key]
              : defaults[key];
          return acc;
        },
        { ...data }
      );

      cleanedData.transaction_id = transactionId;

      return createMutation.mutate(cleanedData, options);
    },
  };

  const formFields = [
    {
      id: "title",
      label: "عنوان",
      rules: { required: "عنوان الزامی است" },
    },
    {
      id: "transaction_type",
      label: "نوع تراکنش",
      as: "select",
      options: [
        { value: "buy", label: "خرید" },
        { value: "sell", label: "فروش" },
      ],
      rules: { required: "نوع تراکنش را انتخاب کنید" },
    },
    {
      id: "item_id",
      label: "آیتم",
      as: "select",
      options: itemOptions,
      rules: { required: "انتخاب آیتم الزامی است" },
    },
    { id: "weight_count", label: "تعداد / وزن", type: "number" },
    { id: "unit_price", label: "قیمت واحد", type: "number" },
    { id: "karat", label: "کارات", type: "number" },
    { id: "ojrat", label: "اجرت", type: "number" },
    { id: "profit", label: "سود", type: "number" },
    { id: "tax", label: "مالیات", type: "number" },
  ];

  const columns = [
    { field: "title", headerName: "عنوان" },
    { field: "transaction_type", headerName: "نوع تراکنش" },
    { field: "weight_count", headerName: "تعداد / وزن" },
    { field: "unit_price", headerName: "قیمت واحد" },
    { field: "karat", headerName: "کارات" },
    { field: "ojrat", headerName: "اجرت" },
    { field: "profit", headerName: "سود" },
    { field: "tax", headerName: "مالیات" },
  ];
  return (
    <GenericEntityPage
      entityName="آیتم معامله"
      useAll={() => ({ data: transactionItems, isLoading: false })}
      useCreate={() => wrappedCreate}
      useUpdate={useTransactionItemUpdate}
      useDelete={useTransactionItemDelete}
      columns={columns}
      formFields={formFields}
      widthModal={"90vw"}
      refetch={refetch}
    />
  );
}
