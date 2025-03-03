"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import useCattleStore from "@/store/cattle-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  identificationNumber: z
    .number({
      required_error: "個体識別番号は必須です",
    })
    .int()
    .positive(),
  earTagNumber: z.number().int().positive().optional(),
  name: z.string().min(1, "名号は必須です"),
  growthStage: z.enum(["CALF", "GROWING", "FATTENING", "ADULT"]),
  birthday: z.string().optional(),
  gender: z.string().min(1, "性別は必須です"),
  score: z.number().int().min(0).max(100).optional(),
  breed: z.string().optional(),
  healthStatus: z.string().optional(),
  producerName: z.string().optional(),
  barn: z.string().optional(),
  breedingValue: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function MobileEditCattle() {
  const router = useRouter();
  const { toast } = useToast();
  const { cattleData } = useCattleStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identificationNumber: cattleData.cattle.identificationNumber,
      earTagNumber: cattleData.cattle.earTagNumber ?? undefined,
      name: cattleData.cattle.name ?? undefined,
      growthStage: cattleData.cattle.growthStage ?? undefined,
      birthday: cattleData.cattle.birthday ?? undefined,
      gender: cattleData.cattle.gender ?? undefined,
      score: cattleData.cattle.score ?? undefined,
      breed: cattleData.cattle.breed ?? undefined,
      healthStatus: cattleData.cattle.healthStatus ?? undefined,
      producerName: cattleData.cattle.producerName ?? undefined,
      barn: cattleData.cattle.barn ?? undefined,
      breedingValue: cattleData.cattle.breedingValue ?? undefined,
      notes: cattleData.cattle.notes ?? undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // TODO: デモアカウントの場合はトースト
    try {
      const token = localStorage.getItem("jwt");

      const res = await client.api.cattle[":cattleId"].$put({
        param: { cattleId: String(cattleData.cattle.cattleId) },
        json: data,
      } as unknown as { param: { cattleId: string }; json: FormData });

      if (res.ok) {
        setIsSubmitting(false);
        toast({
          title: "保存完了",
          description: "牛の個体情報が正常に保存されました。",
        });
        router.push("/cattle");
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      toast({
        title: "保存失敗",
        description: "牛の個体情報を保存できませんでした。再度お試しください。",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label
          htmlFor="identificationNumber"
          className="block text-sm font-medium text-gray-700"
        >
          個体識別番号*
        </label>
        <Controller
          name="identificationNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              id="identificationNumber"
              placeholder="個体識別番号を入力"
              className="mt-1"
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
          )}
        />
        {errors.identificationNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.identificationNumber.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="earTagNumber"
          className="block text-sm font-medium text-gray-700"
        >
          耳標番号
        </label>
        <Controller
          name="earTagNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              id="earTagNumber"
              placeholder="耳標番号を入力"
              className="mt-1"
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          名号*
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="name"
              placeholder="名号を入力"
              className="mt-1"
            />
          )}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="growthStage"
          className="block text-sm font-medium text-gray-700"
        >
          成長段階*
        </label>
        <Controller
          name="growthStage"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="成長段階を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CALF">仔牛</SelectItem>
                <SelectItem value="GROWING">育成牛</SelectItem>
                <SelectItem value="FATTENING">肥育牛</SelectItem>
                <SelectItem value="ADULT">成牛</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.growthStage && (
          <p className="mt-1 text-sm text-red-600">
            {errors.growthStage.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="birthday"
          className="block text-sm font-medium text-gray-700"
        >
          出生日
        </label>
        <Controller
          name="birthday"
          control={control}
          render={({ field }) => (
            <Input {...field} type="date" id="birthday" className="mt-1" />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700"
        >
          性別*
        </label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="性別を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="オス">オス</SelectItem>
                <SelectItem value="メス">メス</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="score"
          className="block text-sm font-medium text-gray-700"
        >
          得点
        </label>
        <Controller
          name="score"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              id="score"
              placeholder="得点を入力"
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="breed"
          className="block text-sm font-medium text-gray-700"
        >
          品種
        </label>
        <Controller
          name="breed"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="breed"
              placeholder="品種を入力"
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="healthStatus"
          className="block text-sm font-medium text-gray-700"
        >
          健康状態
        </label>
        <Controller
          name="healthStatus"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="healthStatus"
              placeholder="健康状態を入力"
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="producerName"
          className="block text-sm font-medium text-gray-700"
        >
          生産者
        </label>
        <Controller
          name="producerName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="producerName"
              placeholder="生産者名を入力"
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="barn"
          className="block text-sm font-medium text-gray-700"
        >
          牛舎
        </label>
        <Controller
          name="barn"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="barn"
              placeholder="牛舎を入力"
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="breedingValue"
          className="block text-sm font-medium text-gray-700"
        >
          育種価
        </label>
        <Controller
          name="breedingValue"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="breedingValue"
              placeholder="育種価を入力"
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          備考
        </label>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="notes"
              placeholder="備考を入力"
              className="mt-1"
            />
          )}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "保存中..." : "保存"}
      </Button>
    </form>
  );
}
