-- CreateTable
CREATE TABLE "ActionBank" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ActionBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agents" (
    "id" SERIAL NOT NULL,
    "dimensionsId" INTEGER,
    "new_field" TEXT NOT NULL,

    CONSTRAINT "Agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetColumnsMetadata" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "AssetColumnsMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetMetadata" (
    "id" SERIAL NOT NULL,
    "clientMetadataId" INTEGER,
    "assetColumnsMetadataId" INTEGER,

    CONSTRAINT "AssetMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientMetadata" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ClientMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataFileTransfer" (
    "id" SERIAL NOT NULL,
    "gcpPaths" TEXT NOT NULL,
    "assetMetadataId" INTEGER,

    CONSTRAINT "DataFileTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dimensions" (
    "id" SERIAL NOT NULL,
    "regimesId" INTEGER,

    CONSTRAINT "Dimensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSequences" (
    "id" SERIAL NOT NULL,
    "eventsId" INTEGER,

    CONSTRAINT "EventSequences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "faarAugmentationsId" INTEGER,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAARAugmentations" (
    "id" SERIAL NOT NULL,
    "actionBankId" INTEGER,

    CONSTRAINT "FAARAugmentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureData" (
    "id" SERIAL NOT NULL,
    "filterLogicId" INTEGER,

    CONSTRAINT "FeatureData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterAndAugmentRecs" (
    "id" SERIAL NOT NULL,
    "predictionId" INTEGER,

    CONSTRAINT "FilterAndAugmentRecs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterComparators" (
    "id" SERIAL NOT NULL,
    "filterLogicId" INTEGER,

    CONSTRAINT "FilterComparators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterLogic" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "FilterLogic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regimes" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Regimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportingDriverTreeKPINodes" (
    "id" SERIAL NOT NULL,
    "reportingDriverTreesId" INTEGER,

    CONSTRAINT "ReportingDriverTreeKPINodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportingDriverTrees" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ReportingDriverTrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportingKPIs" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ReportingKPIs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportingMetrics" (
    "id" SERIAL NOT NULL,
    "reportingKPIsId" INTEGER,

    CONSTRAINT "ReportingMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportingSegments" (
    "id" SERIAL NOT NULL,
    "reportingMetricsId" INTEGER,

    CONSTRAINT "ReportingSegments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingExperiences" (
    "id" SERIAL NOT NULL,
    "eventSequencesId" INTEGER,

    CONSTRAINT "TrainingExperiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReportingDriverTrees_id_idx" ON "ReportingDriverTrees"("id");

-- AddForeignKey
ALTER TABLE "Agents" ADD CONSTRAINT "Agents_dimensionsId_fkey" FOREIGN KEY ("dimensionsId") REFERENCES "Dimensions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetMetadata" ADD CONSTRAINT "AssetMetadata_assetColumnsMetadataId_fkey" FOREIGN KEY ("assetColumnsMetadataId") REFERENCES "AssetColumnsMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetMetadata" ADD CONSTRAINT "AssetMetadata_clientMetadataId_fkey" FOREIGN KEY ("clientMetadataId") REFERENCES "ClientMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataFileTransfer" ADD CONSTRAINT "DataFileTransfer_assetMetadataId_fkey" FOREIGN KEY ("assetMetadataId") REFERENCES "AssetMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dimensions" ADD CONSTRAINT "Dimensions_regimesId_fkey" FOREIGN KEY ("regimesId") REFERENCES "Regimes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSequences" ADD CONSTRAINT "EventSequences_eventsId_fkey" FOREIGN KEY ("eventsId") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_faarAugmentationsId_fkey" FOREIGN KEY ("faarAugmentationsId") REFERENCES "FAARAugmentations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FAARAugmentations" ADD CONSTRAINT "FAARAugmentations_actionBankId_fkey" FOREIGN KEY ("actionBankId") REFERENCES "ActionBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureData" ADD CONSTRAINT "FeatureData_filterLogicId_fkey" FOREIGN KEY ("filterLogicId") REFERENCES "FilterLogic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterAndAugmentRecs" ADD CONSTRAINT "FilterAndAugmentRecs_predictionId_fkey" FOREIGN KEY ("predictionId") REFERENCES "Prediction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterComparators" ADD CONSTRAINT "FilterComparators_filterLogicId_fkey" FOREIGN KEY ("filterLogicId") REFERENCES "FilterLogic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportingDriverTreeKPINodes" ADD CONSTRAINT "ReportingDriverTreeKPINodes_reportingDriverTreesId_fkey" FOREIGN KEY ("reportingDriverTreesId") REFERENCES "ReportingDriverTrees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportingMetrics" ADD CONSTRAINT "ReportingMetrics_reportingKPIsId_fkey" FOREIGN KEY ("reportingKPIsId") REFERENCES "ReportingKPIs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportingSegments" ADD CONSTRAINT "ReportingSegments_reportingMetricsId_fkey" FOREIGN KEY ("reportingMetricsId") REFERENCES "ReportingMetrics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingExperiences" ADD CONSTRAINT "TrainingExperiences_eventSequencesId_fkey" FOREIGN KEY ("eventSequencesId") REFERENCES "EventSequences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
