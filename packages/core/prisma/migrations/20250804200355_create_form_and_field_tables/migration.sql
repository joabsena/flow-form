-- CreateEnum
CREATE TYPE "public"."FieldType" AS ENUM ('TEXT', 'TEXTAREA', 'NUMBER', 'SELECT', 'RADIO', 'CHECKBOX', 'DATE', 'EMAIL');

-- CreateTable
CREATE TABLE "public"."forms" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fields" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "placeholder" TEXT,
    "type" "public"."FieldType" NOT NULL,
    "options" JSONB,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "form_id" TEXT NOT NULL,

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."forms" ADD CONSTRAINT "forms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fields" ADD CONSTRAINT "fields_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
