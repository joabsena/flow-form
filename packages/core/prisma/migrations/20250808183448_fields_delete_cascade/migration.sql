-- DropForeignKey
ALTER TABLE "public"."fields" DROP CONSTRAINT "fields_form_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."fields" ADD CONSTRAINT "fields_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
