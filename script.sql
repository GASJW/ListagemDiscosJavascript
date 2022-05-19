USE [Bib]
GO

/****** Object:  Table [dbo].[Disco]    Script Date: 19/05/2022 16:13:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Disco](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[NomeDisco] [varchar](255) NOT NULL,
	[NomeAutor] [varchar](255) NULL,
	[NumeroDeMusicas] [int] NOT NULL,
	[DataLancamento] [date] NOT NULL
) ON [PRIMARY]
GO


