﻿using System;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Composite.Data.Validation.Validators;

namespace Composite.Data.Types
{
    /// <summary>
    /// A base interface for <see cref="Composite.Data.Types.IPublishSchedule"/> and <see cref="Composite.Data.Types.IUnpublishSchedule"/> interfaces.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [DataScope(DataScopeIdentifier.AdministratedName)]
    public interface ISchedule : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("d617415e-a233-4dc4-b0b7-2b18668616cd")]
        Guid Id { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("e6c8bd27-e3ea-4d0d-bbeb-e6a7a5200447")]
        Guid DataTypeId { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        [ImmutableFieldId("6a137199-8985-4721-93f4-d1a7ef305c22")]
        string DataId { get; set; }

        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("3814914a-5ac9-4e84-bb0e-47be3224991f")]
        Guid WorkflowInstanceId { get; set; }

        /// <exclude />
        [NotNullValidator]
        [StringSizeValidator(0, 16)]
        [StoreFieldType(PhysicalStoreFieldType.String, 16)]
        [DefaultFieldStringValue("")]
        [ImmutableFieldId("8bfc68ee-8f63-4674-b1c8-d1ab1f1489f5")]
        string LocaleCultureName { get; set; }
    }
}
